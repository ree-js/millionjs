import App from "@reejs/react/app";

export default function(props) {
  //seperate children from props
  return <App className="bg-gray-300 dark:bg-black text-gray-900 dark:text-white transition-all duration-500 min-h-screen container-snap"
  {...props}
   >
    {props.children}
   </App>;
}