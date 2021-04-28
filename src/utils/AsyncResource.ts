class AsyncResource<Data> {
  data?: Data;
  error?: Error;
  promise: Promise<void>;
  status: "error" | "pending" | "success";

  constructor(promise: Promise<Data>) {
    this.data = undefined;
    this.error = undefined;
    this.status = "pending";

    this.promise = promise
      .then((data) => {
        this.status = "success";
        this.data = data;
      })
      .catch((error: Error) => {
        this.status = "error";
        this.error = error;
      });
  }

  read(): Data {
    switch (this.status) {
      case "error":
        throw this.error;
      case "pending":
        throw this.promise;
      default: {
        return this.data as Data;
      }
    }
  }
}

export default AsyncResource;
