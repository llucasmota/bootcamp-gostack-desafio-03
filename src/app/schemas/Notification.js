import mongoose, { SchemaTypes } from 'mongoose';

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  /**
   * Para adicionar updatedAt e createdAt
   */
  { timestamps: true }
);

export default mongoose.model('Notification', NotificationSchema);
