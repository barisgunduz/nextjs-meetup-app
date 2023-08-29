import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "A first meetup",
        image: "https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000",
        address: "Some address 5, 123123 city",
        description: "This is a first meetup",
    },
    {
        id: "m2",
        title: "A second meetup",
        image: "https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000",
        address: "Some address 31, 123123 city",
        description: "This is a second meetup",
    },
];

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of meetups"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

/* export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    // fetch data from an api

    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
    };
} */

export async function getStaticProps() {
    // fetch data from an api

    const client = await MongoClient.connect(
        process.env.MONGODB_CONNECTION_STRING
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

export default HomePage;
