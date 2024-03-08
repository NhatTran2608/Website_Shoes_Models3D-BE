const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const RevenueStatistics = new Schema(
    {
        daily_revenue: { type: Number },
        monthly_revenue: { type: Number },
        yearly_revenue: { type: Number }
    },
    {
        timestamps: true,
    },
);

// Add plugins
mongoose.set('strictQuery', false)

RevenueStatistics.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('RevenueStatistics', RevenueStatistics);
