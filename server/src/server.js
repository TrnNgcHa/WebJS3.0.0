import app from "./app.js";
import "dotenv/config"



app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
});

export default app;
