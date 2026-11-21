import { Button } from "@/components/ui/button"
import StudentPage from "./students/page"

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex  min-w-0 flex-col gap-4 text-sm leading-loose">
        <StudentPage/>
      </div>
    </div>
  )
}

// import mongoose from 'mongoose';

// export async function connectToMongoDB() {
//   try {
//     await mongoose.connect("mongodb://<db_username>:KXIOKxExH9U73og5@ac-mhtg5ty-shard-00-00.chmbryk.mongodb.net:27017,ac-mhtg5ty-shard-00-01.chmbryk.mongodb.net:27017,ac-mhtg5ty-shard-00-02.chmbryk.mongodb.net:27017/?ssl=true&replicaSet=atlas-re7nly-shard-0&authSource=admin");
//     console.log("You successfully connected to MongoDB!");
//     return mongoose;
//   } catch (err) {
//     console.dir(err);
//   }
// }

// // Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await mongoose.connection.close();
// }
