import Alert from '../../components/atoms/Alert/Alert';

function Error({data}: any) {
  return <Alert label={`Sorry there is an error. ${data.message}`} />;
}

export default Error;