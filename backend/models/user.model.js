import mongoose from "mongoose";
import bcrypt from "bcrypt";
const serSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
    },
    email: {
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minLength: [6, "Senha deve ter no mínimo 6 caracteres"],
    },
    cartItem: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", serSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export default User;
