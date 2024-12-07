import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment, useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://ei.phncdn.com/videos/202102/12/383481492/original/(m=eaAaGwObaaaa)(mh=INmhD53E5dIzpr4l)2.jpg",
    address: "His Dorm",
    discription: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://imggen.eporner.com/3015490/1920/1080/15.jpg",
    address: "Hotel",
    discription: "This is a second meetup!",
  },
];

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // Fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://faustinoriochristian:MU1yJHy58NmpjKgH@cluster0.vkmly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
