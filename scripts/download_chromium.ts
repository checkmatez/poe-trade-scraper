import { ProgressBar, puppeteer } from "../deps.ts";

const product = "chrome";
const revision = "1022525";

export const downloadChromium = async () => {
  const fetcher = puppeteer.createBrowserFetcher({ product });
  const revisionInfo = fetcher.revisionInfo(revision);

  if (!revisionInfo.local) {
    console.log("Chromium not found, downloading now...");
    let progressBar: ProgressBar;
    const newRevisionInfo = await fetcher.download(
      revisionInfo.revision,
      (current, total) => {
        if (!progressBar) {
          progressBar = new ProgressBar({
            total,
          });
        }
        if (!(progressBar as any).isCompleted) {
          progressBar.render(current);
        } else {
          console.log("Done downloading. Installing now.");
        }
      },
    );
    console.log(
      `Downloaded ${newRevisionInfo.product} ${newRevisionInfo.revision} to ${newRevisionInfo.executablePath} from ${newRevisionInfo.url}`,
    );
  }
};
