import WatchList from "@/components/WatchList/WatchList";

function Page({ params: { id } }) {
  return <WatchList id={id}/>;
}

export default Page;
