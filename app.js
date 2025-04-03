const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const homeRoutes = require('./routes/home');
const serviceRoutes = require('./routes/service');
const businessTaxRoutes = require('./routes/business_tax');
const onlineTaxReturnRoutes = require('./routes/online_tax_return');
const aboutUsRoutes = require('./routes/about_us');
const termsConditionsRoutes = require('./routes/terms_conditions');
const privacyPolicyRoutes = require('./routes/privacy_policy');
const refundPolicyRoutes = require('./routes/refund_policy');
const contactUsRoutes = require('./routes/contact_us');
const contactFormRoutes = require('./routes/contact_form');

dotenv.config();

// Setup global error handlers
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Perform cleanup or logging
    process.exit(1); // Exit with a failure code
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Perform cleanup or logging
    process.exit(1); // Exit with a failure code
  });
  
  // Graceful shutdown function
  const gracefulShutdown = () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
  };
  
  // Handle termination signals for graceful shutdown
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/business-tax', businessTaxRoutes);
app.use('/api/online-tax-return', onlineTaxReturnRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/terms-conditions', termsConditionsRoutes);
app.use('/api/privacy-policy', privacyPolicyRoutes);
app.use('/api/refund-policy', refundPolicyRoutes);
app.use('/api/contact-us', contactUsRoutes);
app.use('/api/contact-form', contactFormRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});