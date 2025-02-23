
const express = require('express');
const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Database configuration
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user info from token
    next();
  });
};

oracledb.initOracleClient({ libDir: process.env.LIBDIR });

// Database connection helper
function getConnection() {
  try {
    return oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
}

function generateUniqueID(prefix) {
  const randomPart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${prefix}${randomPart}`;
}

// User Routes
app.post('/api/register', async (req, res) => {
  const { name, email, PhoneNumber, password } = req.body;
  const connection = await getConnection();
  const userId = generateUniqueID('USR');

  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute(
      `INSERT INTO Users (UserID, FullName, Email, phoneNumber, PasswordHash)
       VALUES (:userId, :name, :email, :PhoneNumber, :hashedPassword)`,
      {
        userId,
        name,
        email,
        PhoneNumber,
        hashedPassword,
      },
      { autoCommit: true }
    );

    res.send({ message: 'user created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const connection = await getConnection();

//   try {
//     const result = await connection.execute(
//       'SELECT UserID, PasswordHash FROM Users WHERE Email = :1',
//       [email]
//     );

//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const [userId, hashedPassword] = result.rows[0];
//     const validPassword = await bcrypt.compare(password, hashedPassword);

//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   } finally {
//     await connection.close();
//   }
// });

// // Trip Routes
// app.post('/api/trips', authenticateToken, async (req, res) => {
//   const { tripName, startDate, endDate, purpose, budget } = req.body;
//   const connection = await getConnection();
//   const tripId = generateUniqueID('TRIP');

//   try {
//     await connection.execute(
//       `INSERT INTO Trips (TripID, UserID, TripName, StartDate, EndDate, Purpose, Budget, CreationDate)
//        VALUES (:1, :2, :3, :4, :5, :6, :7, SYSDATE)`,
//       [tripId, req.user.userId, tripName, startDate, endDate, purpose, budget],
//       { autoCommit: true }
//     );

//     res.json({ tripId });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   } finally {
//     await connection.close();
//   }
// });
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const connection = await getConnection();

  try {
    // Modify query to select Name along with UserID and PasswordHash
    const result = await connection.execute(
      'SELECT UserID, PasswordHash, fullName, phonenumber FROM Users WHERE Email = :1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const [userId, hashedPassword, name, phoneNumber] = result.rows[0];
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET);

    // Include Name in the response
    res.json({ token, name, phoneNumber });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Trip Routes

app.post('/api/trips', authenticateToken, async (req, res) => {
  const { title, startDate, endDate, location, budget, description } = req.body;
  const userId = req.user.userId;

  const tripId = generateUniqueID('TRIP');

  console.log('Insert Data:', {
    tripId,
    userId,
    title,
    startDate,
    endDate,
    location,
    budget,
    description,
  });

  const connection = await getConnection();

  try {
    await connection.execute(
      `INSERT INTO Trips (
        TripID, UserID, tripname, StartDate, EndDate, Location, est_Budget, Description, CreatedAt
      ) VALUES (
        :tripId, :userId, :title, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD'),
        :location, :budget, :description, SYSDATE
      )`,
      {
        tripId,
        userId,
        title,
        startDate,
        endDate,
        location,
        budget,
        description,
      },
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Trip created successfully!', tripId });
  } catch (err) {
    console.error('Error creating trip:', err);
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});



// Get all trips for the authenticated user
app.get('/api/trips', authenticateToken, async (req, res) => {
  const connection = await getConnection();

  try {
    // Query to fetch trips associated with the authenticated user
    const result = await connection.execute(
      `SELECT TripID, UserID, TripName, StartDate, EndDate, Description, Est_Budget, CreatedAt, Location
       FROM Trips WHERE UserID = :userId`,
      [req.user.userId], // Use the userId extracted from the JWT
      {
        outFormat: oracledb.OUT_FORMAT_ARRAY,
      }
    );

    const trips = result.rows.map((row) => ({
      tripId: row[0],        // TripID (VARCHAR2(40))
      userId: row[1],        // UserID (NUMBER)
      tripName: row[2],      // TripName (VARCHAR2(100))
      startDate: row[3],     // StartDate (DATE)
      endDate: row[4],       // EndDate (DATE)
      description: row[5],   // Description (VARCHAR2(200))
      estBudget: row[6],     // Est_Budget (NUMBER(10,2))
      createdAt: row[7],     // CreatedAt (DATE)
      location: row[8],      // Location (VARCHAR2(50))
    }));
    
    // console.log('Trips from DB:', trips);
    res.json(trips);
    
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ error: 'Error fetching trips' });
  } finally {
    await connection.close();
  }
});
//Get all trips for the user by id

app.get('/api/trips/:tripId', authenticateToken, async (req, res) => {
  const tripId= req.params.tripId;
  console.log(tripId)
  const connection = await getConnection();

  try {
    // Query to fetch trips associated with the authenticated user
    const result = await connection.execute(
      `SELECT TripID, UserID, TripName, StartDate, EndDate, Description, Est_Budget, CreatedAt, Location
       FROM Trips WHERE tripId=:tripId`,
      {
        tripId: tripId,
      }, // Use the tripId extracted from the JWT
      {
        outFormat: oracledb.OUT_FORMAT_ARRAY,
      }
    );

    const trips = result.rows.map((row) => ({
      tripId: row[0],        // TripID (VARCHAR2(40))
      userId: row[1],        // UserID (NUMBER)
      tripName: row[2],      // TripName (VARCHAR2(100))
      startDate: row[3],     // StartDate (DATE)
      endDate: row[4],       // EndDate (DATE)
      description: row[5],   // Description (VARCHAR2(200))
      estBudget: row[6],     // Est_Budget (NUMBER(10,2))
      createdAt: row[7],     // CreatedAt (DATE)
      location: row[8],      // Location (VARCHAR2(50))
    }));
    
    console.log('Trips from DB:', trips);
    res.json(trips);
    
  } catch (err) {
    console.error('Error fetching trips:', err);
    res.status(500).json({ error: 'Error fetching trips' });
  } finally {
    await connection.close();
  }
});


// Destination Routes
// app.get('/api/destinations', authenticateToken, async (req, res) => {
//   const { category } = req.query;
//   const connection = await getConnection();

//   try {
//     let query = `SELECT DestinationID as id, Name, Description, Category, ImageURL FROM Destinations`;
//     const params = [];

//     if (category) {
//       query += ` WHERE Category = :category`;
//       params.push(category);
//     }

//     const result = await connection.execute(query, params);

//     const destinations = result.rows.map((row) => ({
//       id: row[0],
//       name: row[1],
//       description: row[2],
//       category: row[3],
//       imageUrl: row[4],
//     }));

//     res.json(destinations);
//   } catch (err) {
//     console.error('Error fetching destinations:', err);
//     res.status(500).json({ error: 'Error fetching destinations' });
//   } finally {
//     await connection.close();
//   }
// });
app.get('/api/destination/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // Get destination ID from the URL parameter
  console.log(id);
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `SELECT * FROM destination WHERE id = :id`, // Query using destination table
      {
        id: Number(id) // Pass the id as a parameter
      }
    );

    let destination = null; // Declare destination as null initially
    console.log("details:", result.rows);

    if (result.rows.length > 0) {
      // Process each row and handle CLOB data for DESCRIPTION
      destination = await Promise.all(result.rows.map(async (row) => {
        if (row.DESCRIPTION && row.DESCRIPTION instanceof Lob) {
          // If DESCRIPTION is a CLOB, convert it to a string
          row.DESCRIPTION = await new Promise((resolve, reject) => {
            let clobData = '';
            row.DESCRIPTION.setEncoding('utf8'); // Set encoding to read as text
            row.DESCRIPTION.on('data', (chunk) => {
              clobData += chunk;
            });
            row.DESCRIPTION.on('end', () => resolve(clobData)); // Resolve when all data is read
            row.DESCRIPTION.on('error', (err) => reject(err)); // Reject on error
          });
        }
        return row; // Return the processed row
      }));
    } else {
      res.status(404).send('Destination not found');
      return; // Stop execution here if destination is not found
    }

    res.json(destination); // Send the processed destination details as JSON
  } catch (err) {
    console.error('Error fetching destination details:', err);
    res.status(500).json({ error: 'Error fetching destination details' });
  } finally {
    await connection.close();
  }
});


app.get('/api/destinations', authenticateToken, async (req, res) => {
  const { category } = req.query; // Query parameter for filtering
  const connection = await getConnection();

  try {
    // Base query
    let query = `
      SELECT 
        AttractionID AS id, 
        Destination AS name, 
        Description AS description, 
        :category AS category,
        'https://default-image-url.com' AS imageUrl -- Replace with actual image handling logic
      FROM LocalAttractions
    `;
    const params = [];

    // Add WHERE clause if category is provided
    if (category) {
      query += ` WHERE LOWER(Category) = LOWER(:category)`;
      params.push(category);
    }

    // Execute the query
    const result = await connection.execute(query, params, { outFormat: require('oracledb').OUT_FORMAT_OBJECT });

    // Transform rows into desired format
    const destinations = result.rows.map((row) => ({
      id: row.ID,
      name: row.NAME,
      description: row.DESCRIPTION,
      category: row.CATEGORY,
      imageUrl: row.IMAGEURL, // Default or real URL
    }));

    res.json(destinations); // Send the result as JSON
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Error fetching destinations' });
  } finally {
    await connection.close(); // Always close the connection
  }
});

app.get('/api/activities/:tripId', authenticateToken, async (req, res) => {
  const tripId = req.params.tripId;
  const connection = await getConnection();

  try {
    // Base query
    let query = `
      SELECT 
        ActivityID AS id,
        ActivityName AS name,
        StartTime AS startTime,
        TripID
      FROM Activities
      WHERE TRIPID = :tripid
    `;
    

    // Execute the query
    const result = await connection.execute(query, {
      tripid: tripId,
    }, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    // Transform rows into desired format
    const activities = result.rows.map((row) => ({
      id: row.ID,
      name: row.NAME,
      startTime: row.STARTTIME,
      tripId: row.TRIPID,
    }));
    // console.log(activities);
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Error fetching activities' });
  } finally {
    await connection.close(); // Always close the connection
  }
});

app.delete('/api/activities/:tripId/:activityId', authenticateToken, async (req, res) => {
  const { tripId, activityId } = req.params;
  const connection = await getConnection();

  try {
    // Delete query
    const query = `
      DELETE FROM Activities
      WHERE ActivityID = :activityId
        AND TripID = :tripId
    `;

    // Execute query
    const result = await connection.execute(query, {
      activityId:activityId,
      tripId:tripId,
    }, { autoCommit: true });
    // console.log(result)

    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error.message);
    res.status(500).json({ error: 'Error deleting activity' });
  } finally {
    await connection.close(); // Always close the connection
  }
});

app.post('/api/activities/:tripId', authenticateToken, async (req, res) => {
  const tripId = req.params.tripId;
  const connection = await getConnection();
  console.log("server activites: ",req.body,tripId);


  try {
    // Base query
    let query = `
      INSERT INTO ACTIVITIES VALUES (:activityId, :tripId, : ActivityName, :startTime)
    `;
    

    // Execute the query
    const result = await connection.execute(query, {
      activityId: generateUniqueID('ACT'),
      tripId: tripId,
      ActivityName: req.body.description,
      startTime:req.body.time
    }, { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit:true });

    // console.log(result);
    res.send({message:"activity posted"});
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Error fetching activities' });
  } finally {
    await connection.close(); // Always close the connection
  }
});

// Travel Statistics Route
app.get('/api/travel-stats', authenticateToken, async (req, res) => {
  const connection = await getConnection();
  const userId = req.user.userId
  // console.log(userId)

  try {
    // Query the database for the travel statistics based on the trips table
    const result = await connection.execute(
      `SELECT
    COUNT(*) AS totalTrips,
    COUNT(DISTINCT location) AS countriesVisited,
    SUM(ENDDATE - STARTDATE) * 24 AS hoursTraveled, -- Convert days to hours
    AVG(ENDDATE - STARTDATE) AS avgTripDuration
FROM trips
WHERE USERID = :userId
`,
      {
        userId: userId,
      },
      {
        outFormat: oracledb.OUT_FORMAT_ARRAY
      }
    );

    // Assuming you want these specific stats based on the trips data
    const stats = result.rows[0];
    console.log(stats);
    res.json({
      trips: stats[0],  // You can calculate total distance if there's a related column for distance (currently not in trips table)
      countriesVisited: stats[1], // You can keep this as countriesVisited or add a city column if available
      hoursTraveled: stats[2],  // Total hours based on duration
      avgTripDuration: stats[3] // Average trip duration in days
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});



// Settings Routes
app.get('/api/settings', authenticateToken, async (req, res) => {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `SELECT Notifications, DarkMode, Language 
       FROM UserSettings WHERE UserID = :userId`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      // Return default settings if no record is found
      return res.json({
        notifications: true,
        darkMode: false,
        language: 'English',
      });
    }

    const [notifications, darkMode, language] = result.rows[0];
    res.json({ notifications: !!notifications, darkMode: !!darkMode, language });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

app.put('/api/settings', authenticateToken, async (req, res) => {
  const { notifications, darkMode, language } = req.body;
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      `MERGE INTO UserSettings us
       USING (SELECT :userId AS UserID FROM dual) new_settings
       ON (us.UserID = new_settings.UserID)
       WHEN MATCHED THEN
         UPDATE SET Notifications = :notifications, DarkMode = :darkMode, Language = :language
       WHEN NOT MATCHED THEN
         INSERT (UserID, Notifications, DarkMode, Language)
         VALUES (:userId, :notifications, :darkMode, :language)`,
      {
        userId: req.user.userId,
        notifications: notifications ? 1 : 0,
        darkMode: darkMode ? 1 : 0,
        language,
      },
      { autoCommit: true }
    );

    res.json({ message: 'Settings saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});


// Emergency Contacts
app.post('/api/trips/:tripId/emergency-contacts', authenticateToken, async (req, res) => {
  const { tripId } = req.params;
  const { name, relation, contactDetails } = req.body;
  const connection = await getConnection();
  const contactId = generateUniqueID('ECON');

  try {
    await connection.execute(
      `INSERT INTO EmergencyContacts (ContactID, TripID, Name, Relation, ContactDetails)
       VALUES (:1, :2, :3, :4, :5)`,
      [contactId, tripId, name, relation, contactDetails],
      { autoCommit: true }
    );

    res.json({ contactId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Notifications
app.post('/api/notifications', authenticateToken, async (req, res) => {
  const { message } = req.body;
  const connection = await getConnection();
  const notificationId = generateUniqueID('NOTI');

  try {
    await connection.execute(
      `INSERT INTO Notifications (NotificationID, UserID, Message, Timestamp, ReadStatus)
       VALUES (:1, :2, :3, SYSDATE, 'UNREAD')`,
      [notificationId, req.user.userId, message],
      { autoCommit: true }
    );

    res.json({ notificationId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await connection.close();
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
