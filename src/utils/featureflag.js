
export const isFeatureFlagAllowed = () => {
 const params = new URLSearchParams(window.location.search);
 console.log(params)
  return params.has('entornopruebas');
}