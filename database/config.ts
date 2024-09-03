import mongoose from 'mongoose';

const options: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  authSource: 'admin',
  retryWrites: true
};

export const dbConnection = async () => {
  try {
    const dbUri = `${process.env.URLMONGO}`;
    await mongoose
      .connect(dbUri, options)
      .then(() => console.log("Conectado a MongoDB"))
      .catch((err) => console.error("Error de conexión a MongoDB:", err));
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
    throw new Error("Error al conectar a la base de datos");
  }
};
