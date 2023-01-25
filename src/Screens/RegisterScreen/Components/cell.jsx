export const Cell = ({ children, style, ...rest }) => (
  <td
    style={{
      padding: '5px 5px',
      verticalAlign: 'top',
      ...style
    }}
    {...rest}
  >
    {children}
  </td>
)
