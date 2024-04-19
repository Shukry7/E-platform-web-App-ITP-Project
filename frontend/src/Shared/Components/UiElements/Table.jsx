import React from "react";

const Table = (props) => {
  return(
  <>
    <div class="relative overflow-x-auto max-h-[520px] min-h-96 shadow-md sm:rounded-lg ">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-50 uppercase bg-gray-600 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          {props.Headings.map((heading)=>{

            return (
                <th scope="col" class={props.Style || "px-6 py-3"}>
                {heading}
            </th>
            )
          })}
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  </>);
};

export default Table;
