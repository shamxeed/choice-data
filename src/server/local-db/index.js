import fs from 'fs';
import path from 'path';

const filePath = path.join('/tmp', 'config.json');

export const helpers = () => {
  const config = fs.readFile(
    path.join(process.cwd(), '/tmp/config.json'),
    function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('reads successfully!');
    }
  );

  console.log(config);

  const get = () => config;

  const saveData = () =>
    fs.writeFile(filePath, JSON.stringify(config), function (e) {
      console.log(e);
    });

  const update = ({ field, data }) => {
    const { text, ...rest } = data;
    if (field === 'notification') {
      config.notification = text;
    } else {
      config[field] = rest;
    }

    saveData();

    return config;
  };

  return {
    get,
    update,
    saveData,
  };
};
