const Content = ({ content }) => {
  return (
    <>
      <li>
        {content.name} <span>{content.exercises}</span>
      </li>
    </>
  );
};

export default Content;
