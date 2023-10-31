const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [2, 'Username must be at least 2 characters in length.']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(val);
      },
      message() {
        return 'You must enter a valid email address.'
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Password must be at least 6 characters in length.']
  },
  shops: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Shop'
    }
  ]
}, {
  methods: {
    async validatePass(formPassword) {
      const is_valid = await compare(formPassword, this.password);

      return is_valid;
    }
  },
  virtuals: {
    userData: {
      get() {
        return this.username + ' - ' + this.email;
      }
    },
    // fullName: {
    //   get() {
    //     return this.firstName + ' ' + this.lastName;
    //   }
    // }
  },
  toJSON: {
    virtuals: true
  }
});

// Encrypt the user's password before the user is stored to the DB
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }

  next();
});

// Remove user's password from JSON responses
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
}

const User = model('User', userSchema);

module.exports = User;