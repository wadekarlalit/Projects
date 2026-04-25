
function Button({ children, ...props }) {
  return React.createElement("button", props, children);
}

function Select({ value, onChange }) {
  return React.createElement(
    "select",
    { className: "form-select", value, onChange },
    [
      React.createElement("option", { value: "todo", key: "todo" }, "Todo"),
      React.createElement("option", { value: "progress", key: "progress" }, "Progress"),
      React.createElement("option", { value: "done", key: "done" }, "Done"),
    ]
  );
}

function TR(props) {
  const statusColor =
    props.status === "done"
      ? "success"
      : props.status === "progress"
      ? "warning"
      : "secondary";

  return React.createElement("tr", {}, [
    React.createElement("td", {}, props.index + 1),

    React.createElement(
      "td",
      {},
      props.currentEditIdx === props.index
        ? React.createElement("input", {
            className: "form-control",
            value: props.value,
            onChange: (e) => props.setValue(e.target.value),
          })
        : props.title
    ),

    React.createElement(
      "td",
      {},
      React.createElement("span", { className: `badge bg-${statusColor} me-2` }, props.status),
      React.createElement(Select, {
        value: props.status,
        onChange: (e) => {
          const temp = [...props.items];
          temp[props.index].status = e.target.value;
          props.setItems(temp);
        },
      })
    ),

    React.createElement("td", {}, [
      React.createElement(
        Button,
        {
          className: "btn btn-sm btn-warning me-2",
          onClick: () => {
            if (props.currentEditIdx === props.index) {
              const temp = [...props.items];
              temp[props.index].title = props.value;

              props.setItems(temp);
              props.setValue("");
              props.setCurrentEditIdx(-1);
            } else {
              props.setCurrentEditIdx(props.index);
              props.setValue(props.title);
            }
          },
        },
        props.currentEditIdx === props.index ? "Save" : "Edit"
      ),

      React.createElement(
        Button,
        {
          className: "btn btn-sm btn-danger",
          onClick: () => props.deleteItem(props.index),
        },
        "Delete"
      ),
    ]),
  ]);
}

export function App() {
  const [value, setValue] = React.useState("");
  const [currentEditIdx, setCurrentEditIdx] = React.useState(-1);

  const [items, setItems] = React.useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved && saved !== "undefined" ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  function add() {
    if (!value.trim()) return;

    setItems([
      ...items,
      { title: value, id: Date.now(), status: "todo" },
    ]);
    setValue("");
  }

  function deleteItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function clearAll() {
    localStorage.removeItem("todos");
    setItems([]);
  }

  return React.createElement("div", { className: "container py-4" }, [
    React.createElement("h2", { className: "mb-4 text-center" }, "🚀 Todo App"),

    // Input Card
    React.createElement(
      "div",
      { className: "card p-3 shadow-sm mb-4" },
      React.createElement("form", {
        onSubmit: (e) => {
          e.preventDefault();
          add();
        },
      },
        React.createElement("div", { className: "input-group" }, [
          React.createElement("input", {
            className: "form-control",
            placeholder: "Enter task...",
            value: value,
            onChange: (e) => setValue(e.target.value),
          }),
          React.createElement(
            "button",
            { className: "btn btn-primary", type: "submit" },
            "Add"
          ),
        ])
      )
    ),

    // Actions
    items.length > 0 &&
      React.createElement(
        "div",
        { className: "mb-3 text-end" },
        React.createElement(
          Button,
          { className: "btn btn-outline-danger btn-sm", onClick: clearAll },
          "Clear All"
        )
      ),

    // Table / Empty State
    items.length === 0
      ? React.createElement(
          "div",
          { className: "text-center text-muted mt-5" },
          "No tasks yet 😴"
        )
      : React.createElement(
          "table",
          { className: "table table-bordered table-hover shadow-sm" },
          [
            React.createElement("thead", {},
              React.createElement("tr", {},
                ["#", "Task", "Status", "Actions"].map((h) =>
                  React.createElement("th", { key: h }, h)
                )
              )
            ),

            React.createElement(
              "tbody",
              {},
              items.map((item, index) =>
                React.createElement(TR, {
                  key: item.id,
                  index,
                  title: item.title,
                  status: item.status,
                  items,
                  deleteItem,
                  currentEditIdx,
                  setCurrentEditIdx,
                  setItems,
                  value,
                  setValue,
                })
              )
            ),
          ]
        ),
  ]);
}