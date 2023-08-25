import MeetupList from "../components/meetups/MeetupList";

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
    return <MeetupList meetups={props.meetups} />;
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
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
        revalidate: 1,
    };
}

export default HomePage;
