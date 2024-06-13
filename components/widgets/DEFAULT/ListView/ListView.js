// Компонент скролящегося вертикального списка элементов 
const ListView = ({ height, list, builder }) => {
  return (
    <div style={{ height: `${height}vw`, width: '100%', overflowY: 'auto' }}>
      <div style={{ height: 'auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {list && list.length>0 && list.map((e, index) => (
          builder(e, index) // Передаем элемент и его индекс в builder
        ))}
      </div>
    </div>
  );
};

export default ListView;
