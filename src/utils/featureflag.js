
export const isFeatureFlagAllowed = () => {
 const params = new URLSearchParams(window.location.search);
 console.log(params)
<<<<<<< HEAD
  return params.has('entornopruebas') || true;
=======
  return params.has('entornopruebas');
>>>>>>> origin/main
}