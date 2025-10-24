import EmbeddedApplication from "../../components/EmbeddedApplication/EmbeddedApplication";

export default function EmbedPage(props: { pageID: string }) {
	return <EmbeddedApplication name={props.pageID} sx={{ flexGrow: 1 }} />;
}
