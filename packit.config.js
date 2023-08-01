import million from "million/compiler";
export default {
  unplugins:[
    million.unplugin.vite({
      mode: 'react', server: true
    })
  ],
  copyToPackit:[
    async (service, isDevMode, glob) => {
      let folders = isDevMode ? [] : ["node_modules/react-dom"];
      //use glob to get all files in folders
      let files = folders.map(folder => glob.sync(`./${folder}/**/*`, { nodir: true })).flat();
      console.log(files.filter(e => e.includes("react-dom")).join("\n"));
      files = [...files, ...(service == "deno-deploy" ? [] : ["package.json", "import_map.json", ".reecfg.json", "tailwind.config.js", "twind.config.js"])];
      return { files, folders: [] };
    }
  ]
}