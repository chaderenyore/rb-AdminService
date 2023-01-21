const Admins = [];
async function formatCreateAdminResponse(AdminInDb) {
  const Admin = {
    admin_id: AdminInDb.id,
    username: AdminInDb.username,
    email: AdminInDb.email,
    created_at: AdminInDb.created_at,
    updated_at: AdminInDb.updated_at,
    image: AdminInDb.image,
    role: AdminInDb.role,
    status: AdminInDb.status,
    can_write: AdminInDb.can_write,
  };
  return Admin;
}

async function formatLoginResponse(AdminInDb) {
  const Admin = {
    admin_id: AdminInDb.id,
    username: AdminInDb.username,
    email: AdminInDb.email,
    updated_at: AdminInDb.updated_at,
    image: AdminInDb.image,
    role: AdminInDb.role,
    status: AdminInDb.status,
    can_write: AdminInDb.can_write,
    created_at: AdminInDb.created_at,
    last_login: AdminInDb.updated_at
  };
  return Admin;
}

async function formatGetAllAdminRespnse(admin) {
  //  loop through the returned advert and format
  await admin.forEach((result) => {
    Admin = {
      username: result.username,
      admin_id: result.id,
      email: result.email,
      created_at: result.created_at,
      updated_at: result.updated_at,
      image: result.image,
      role: result.role,
      status: result.status,
      can_write: result.can_write,
    };
    Admins.push(Admin);
  });
  return Admins;
}


module.exports = {
  formatCreateAdminResponse,
  formatLoginResponse,
  formatGetAllAdminRespnse
};
