
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function extractErrorsFromResponse(response) {
  const { data: { message } } = response;
  const result = [];

  if (message instanceof Array) {
    message.forEach((element) => {
      if (element.constraints) {
        const { constraints } = element;
        const arr = Object.values(constraints);
        arr.forEach((el) => {
          result.push(capitalizeFirstLetter(el));
        });
      }
    });
  } else {
    result.push(message);
  }

  return result;
};
