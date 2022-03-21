const mongoose = require("mongoose");

const toJSON = {
  transform(doc, result) {
    delete result._id;
    result.id = doc._id;
  },
};

const IntegrationsSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const UsersSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    origin: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    installed: { type: Boolean, default: true },
    permissions: [],
    token: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const PagesSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    tasks: { type: Array, required: true, default: [] },
    token: { type: String, required: true },
    serverToken: { type: String, required: true },
    subscribed: { type: Boolean, required: true, default: false },
    owner: { type: String, ref: "Users", required: true },
    instagram: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      username: { type: String, required: true },
    },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

const ProfilesSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    profile_pic: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
    id: true,
    toJSON,
  }
);

UsersSchema.statics = {
  async updateUserOrigin(id, origin) {
    return Users.findByIdAndUpdate(
      id,
      { $set: { origin } },
      { upsert: false, new: true }
    );
  },
  async updateUserStatus(id, installed) {
    return Users.findByIdAndUpdate(
      id,
      { $set: { installed } },
      { upsert: false, new: true }
    );
  },
};

PagesSchema.statics = {
  async findOrCreate(id, creator) {
    return Pages.findById(id).then((page) => {
      return !!page ? page : creator();
    });
  },
  async setInstagram(page, instagram) {
    return Pages.findByIdAndUpdate(
      page,
      { instagram },
      { upsert: false, new: true }
    );
  },
};

ProfilesSchema.statics = {
  async findOrCreate(id, creator) {
    return Profiles.findById(id).then((profile) => {
      return !!profile ? profile : creator();
    });
  },
};

const Users = mongoose.model("Users", UsersSchema);
const Pages = mongoose.model("Pages", PagesSchema);
const Profiles = mongoose.model("Profile", ProfilesSchema);
const Integrations = mongoose.model("Integrations", IntegrationsSchema);

module.exports = {
  Users,
  Pages,
  Profiles,
  Integrations,
};
