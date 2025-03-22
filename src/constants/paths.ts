// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  realtor: path(ROOTS_DASHBOARD, "/realtor"),
  root: ROOTS_DASHBOARD,
};
