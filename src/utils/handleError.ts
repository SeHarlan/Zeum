
interface ServerErrorArgs {
  error: any;
  report?: boolean;
  location: string;
}
export const handleServerError = ({ error, report, location } : ServerErrorArgs) => { 
  const errorMessage = error?.message ? error.message : error;
  console.error(`${location} -- ${errorMessage}`);

  if (report) {
    //TODO report error
  }
}

export const handleClientError = ({ error, report, location } : ServerErrorArgs) => { 
  const errorMessage = error?.message ? error.message : error;
  console.error(`${location} -- ${errorMessage}`);

  if (report) {
    //TODO report error
  }
}