// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  chat: path(ROOTS_DASHBOARD, "/chat"),
  dataGeneration: path(ROOTS_DASHBOARD, "/data-generation"),
  listing: (mls: string) => path(ROOTS_DASHBOARD, `/realtor/listing/${mls}`),
  realtor: path(ROOTS_DASHBOARD, "/realtor"),
  root: ROOTS_DASHBOARD,
};
