class AsyncResource {
  constructor(promise) {
    this.data = undefined;
    this.error = undefined;
    this.promise = null;
    this.status = "pending";

    this.promise = promise
      .then((data) => {
        this.status = "success";
        this.data = data;
      })
      .catch((error) => {
        this.status = "error";
        this.error = error;
      });
  }

  read() {
    switch (this.status) {
      case "error":
        throw this.error;
      case "pending":
        throw this.promise;
      default:
        return this.data;
    }
  }
}

export default AsyncResource;
