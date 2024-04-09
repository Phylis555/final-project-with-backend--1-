const Donation = require('../models/donation.model');
const Fund = require('../models/fund.model');

const completeRegularDonations = async () => {
    try {
        const now = new Date; // Get the current date and time
        
        // Find donations where donationEndDate is less than current date
        const expiredDonations = await Donation.find({
            donationEndDate: { $lt: now }
        });
        expiredDonations.forEach((donation) => {
            donation.status = 'completed';
            donation.save();
        });
    } catch (error) {
        console.error('Error finding expired donations:', error);
        throw error;
    }
}

const completeFundDonations = async () => {
    try {
        const now = new Date; // Get the current date and time
        
        // Find donations where donationEndDate is less than current date
        const expiredFunds = await Fund.find({
            endingDate: { $lt: now }
        });
        expiredFunds.forEach((fund) => {
            fund.status = 'completed';
            fund.save();
        });
    } catch (error) {
        console.error('Error finding expired donations:', error);
        throw error;
    }
}

const completeDonations = async () => {
    completeRegularDonations();
    completeFundDonations();
}

module.exports = completeDonations;