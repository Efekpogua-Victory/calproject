/* eslint-disable prettier/prettier */
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-screen p-10 bg-gray-100">
        <div className="container mt-20">
          <div className=" row">
            <div className="p-3 text-center bg-white col md:col-6 md:offset-3">
              <h1 className="text-3xl text-success">Success!!</h1>
              <h1 className="text-2xl font-bold text-black">This meeting is scheduled</h1>
              <p className="text-sm ">
                We emailed you and the other attendees a calender invitation with all the details
              </p>{" "}
              <br />
              <hr />
              <br />
              <div>
                <p className="inline font-bold text-left">What: </p>
                <p className="inline text-right">15m Meeting between daniel and test</p>
              </div>
              <div>
                <p className="inline font-bold text-left">When: </p>
                <p className="inline text-right">2-22-03</p>
              </div>
              <div className="mt-4">
                <button className="bg-black rounded-none btn" onClick={() => router.push("/")}>
                  Try Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
