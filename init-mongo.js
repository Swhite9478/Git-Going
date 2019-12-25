db.createUser({
  user: "devadmin",
  pwd: "devadmin",
  roles: {
    role: "root",
    db: "Git_Going"
  }
});