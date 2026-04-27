require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Presentation = require('./models/presentationModel');
const Slide = require('./models/slideModel');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Presentation.deleteMany();
    await Slide.deleteMany();

    // Seed users
    const users = [
      { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
      { name: 'Bob Smith', email: 'bob.smith@example.com' },
      { name: 'Charlie Brown', email: 'charlie.brown@example.com' },
      { name: 'Diana Prince', email: 'diana.prince@example.com' },
      { name: 'Eve Wilson', email: 'eve.wilson@example.com' }
    ];
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded');

    // Seed presentations
    const presentations = [
      { title: 'Introduction to React', description: 'Basics of React framework', userId: createdUsers[0]._id, theme: 'default' },
      { title: 'Database Design', description: 'MongoDB best practices', userId: createdUsers[1]._id, theme: 'dark' },
      { title: 'API Development', description: 'Building REST APIs with Express', userId: createdUsers[2]._id, theme: 'light' },
      { title: 'Frontend Optimization', description: 'Performance tips for web apps', userId: createdUsers[3]._id, theme: 'colorful' },
      { title: 'Deployment Strategies', description: 'Cloud deployment with Docker', userId: createdUsers[4]._id, theme: 'default' }
    ];
    const createdPresentations = await Presentation.insertMany(presentations);
    console.log('Presentations seeded');

    // Seed slides
    const slides = [
      // Presentation 1
      { presentationId: createdPresentations[0]._id, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.', contentType: 'text', order: 1 },
      { presentationId: createdPresentations[0]._id, title: 'Components', content: 'Reusable UI components', contentType: 'text', order: 2 },
      { presentationId: createdPresentations[0]._id, title: 'State Management', content: '- useState hook\n- useEffect hook\n- Context API', contentType: 'list', order: 3 },

      // Presentation 2
      { presentationId: createdPresentations[1]._id, title: 'MongoDB Basics', content: 'NoSQL database for modern applications', contentType: 'text', order: 1 },
      { presentationId: createdPresentations[1]._id, title: 'Schema Design', content: 'Embedding vs Referencing', contentType: 'text', order: 2 },
      { presentationId: createdPresentations[1]._id, title: 'Indexing', content: 'Improve query performance', contentType: 'text', order: 3 },

      // And so on for others, to have at least 5 per collection
      { presentationId: createdPresentations[2]._id, title: 'REST Principles', content: 'Stateless, Cacheable, Uniform Interface', contentType: 'list', order: 1 },
      { presentationId: createdPresentations[2]._id, title: 'Express Routing', content: 'app.get, app.post, etc.', contentType: 'text', order: 2 },
      { presentationId: createdPresentations[2]._id, title: 'Middleware', content: 'Functions that process requests', contentType: 'text', order: 3 },

      { presentationId: createdPresentations[3]._id, title: 'Lazy Loading', content: 'Load components on demand', contentType: 'text', order: 1 },
      { presentationId: createdPresentations[3]._id, title: 'Code Splitting', content: 'Split bundle for better performance', contentType: 'text', order: 2 },
      { presentationId: createdPresentations[3]._id, title: 'Image Optimization', content: 'Compress and lazy load images', contentType: 'text', order: 3 },

      { presentationId: createdPresentations[4]._id, title: 'Docker Basics', content: 'Containerization platform', contentType: 'text', order: 1 },
      { presentationId: createdPresentations[4]._id, title: 'Dockerfile', content: 'Instructions to build image', contentType: 'code', order: 2 },
      { presentationId: createdPresentations[4]._id, title: 'Deployment', content: 'Push to cloud platforms', contentType: 'text', order: 3 }
    ];
    await Slide.insertMany(slides);
    console.log('Slides seeded');

    console.log('Seeding completed');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();