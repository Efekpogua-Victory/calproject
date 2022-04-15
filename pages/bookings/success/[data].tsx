/* eslint-disable prettier/prettier */
import { useRouter } from "next/router";

import prisma from "@helpers/prisma";

const Success = (props: any) => {
  const router = useRouter();
  //console.log(props.booking);

  return (
    <>
      {props.booking ? (
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
                  <p className="inline text-right">
                    {props.booking.event_type.length} min, {props.booking.event_type.title}
                  </p>
                </div>
                <div>
                  <p className="inline font-bold text-left">When: </p>
                  <p className="inline text-right">{new Date(props.booking.booking_date).toDateString()}</p>
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
      ) : (
        <div className="w-full h-screen p-10 bg-gray-100">
          <div className="container">
            <div className="row">
              <div className="md:col-6 md:offset-3 shadow p-4 text-center font-sans">
                <h1 className="text-3xl text-black">Invalid Booking</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Success;

export async function getServerSideProps(context) {
  const bookingId = context.params.data;

  const booking = await prisma.booking.findUnique({
    where: {
      id: parseInt(bookingId),
    },
    include: {
      event_type: true,
    },
  });

  return {
    props: {
      booking: booking,
    }, // will be passed to the page component as props
  };
}
