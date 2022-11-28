//store data into constant value
const KEYS = {
  users: "users",
  userId: "userId",
};

// save new user data into local storage
export function insertNewUser(data) {
  let users = getAllUsers();
  data["id"] = generateUserId();
  users.push(data);
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

//generate id for user
export function generateUserId() {
  if (localStorage.getItem(KEYS.userId) == null)
    localStorage.setItem(KEYS.userId, "0");
  var id = parseInt(localStorage.getItem(KEYS.userId));
  localStorage.setItem(KEYS.userId, (++id).toString());
  return id;
}

// retrieve user data in the "users"
export function getAllUsers() {
  //check if the key is occupied
  if (localStorage.getItem(KEYS.users) == null)
    localStorage.setItem(KEYS.users, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.users));
}

//update user information
export function updateUser(data) {
  let users = getAllUsers();
  let recordIndex = users.findIndex((x) => x.id === data.id);
  users[recordIndex] = { ...data };
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

//delete user
export function deleteUser(id) {
  let users = getAllUsers();
  users = users.filter((x) => x.id !== id);
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}
