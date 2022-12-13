export const getRegExp = {
  test: () => ({
    _rx_url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    _rx_email: /^[\w-\.]+@([\w-]+\.)+[\w-^\s]{2,3}$/g,
    _rx_space: / /g,
  }),
  match: () => ({
    _rx_names: "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+ [A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$",
    _rx_name: "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°]+$",
  })
}