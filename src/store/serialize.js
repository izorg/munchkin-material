/*
 * Remove router reducer to prevent redirection when restoring data coming
 * to another URL then in LocalStorage
 */
export default ({ router, ...subset }) => JSON.stringify(subset);
