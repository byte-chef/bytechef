import mongoose from 'mongoose';

export interface Session {
  userId: string;
}

export interface SessionAttrs extends Session {}

export interface SessionModel extends mongoose.Model<SessionDocument> {
  build: (attrs: SessionAttrs) => SessionDocument;
}

export interface SessionDocument extends SessionAttrs, mongoose.Document {
  id: string;
}

const sessionSchema = new mongoose.Schema<SessionAttrs>(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      // Include virtual getters as properties (such as _id -> id) when converting to JSON
      virtuals: true,
      transform: (doc, ret, options) => {
        return ret;
      },
    },
    toObject: {
      // Include virtual getters as properties (such as _id -> id) when converting to objects
      virtuals: true,
      transform: (doc, ret, options) => {
        return ret;
      },
    },
  }
);

sessionSchema.statics.build = (attrs: SessionAttrs) => {
  return new SessionModel(attrs);
};

const SessionModel = mongoose.model<SessionDocument, SessionModel>(
  'Session',
  sessionSchema
);

export { SessionModel };
