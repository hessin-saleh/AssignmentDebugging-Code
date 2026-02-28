const Task = require("../models/Task");
// convert to async and await
const createTask = async(req, res) => {
  try{const { title } = req.body;
  if (!title) return res.status(400).json({ msg: "Title is required" });

  const Ntask= await Task.create({ title })
  // code created 200 --->  201  
  res.status(201).json({ msg: "Task Created", data: Ntask });}
  catch(err){
    console.log(err)
    res.status(500).json({ msg: "server errore" })
  }
  }
  

// const createTask = (req, res) => {
//   const { title } = req.body;
//   if (!title) return res.status(400).json({ msg: "Title is required" });

//   Task.create({ title }).then((task) => {
//     res.status(200).json({ msg: "Task Created", data: task });
//   });
// };


// convert to async and await
const getTasks = async(req, res) => {
 try{const tasks= await Task.find()
 // add new validtion 
  if(!tasks) return res.status(404).json({ msg: "not found tasks." })
    res.status(200).json({ msg: "Tasks List", data: tasks });
}
 catch(err){console.log(err)
    res.status(500).json({ msg: "server errore" })}
};

// const getTasks = (req, res) => {
//   Task.find().then((tasks) => {
//     res.status(200).json({ msg: "Tasks List", data: tasks });
//   });
// };



// add try, catch and validtion
const createTaskWithCheck = async (req, res) => {
  try{const { title } = req.body;
  if (!title) return res.status(400).json({ msg: "Title is required" });

  const exist = await Task.findOne({ title });
  if (exist) return res.status(400).json({ msg: "Task already exists" });

  const task = await Task.create({ title });
  res.status(201).json({ msg: "Task Created", data: task });
}catch(err){console.log(err)
    res.status(500).json({ msg: "server errore" })}}
// const createTaskWithCheck = async (req, res) => {
//   const { title } = req.body;
//   const exist = await Task.findOne({ title });
//   if (exist) return res.status(400).json({ msg: "Task already exists" });

//   const task = await Task.create({ title });
//   res.status(201).json({ msg: "Task Created", data: task });
// };

module.exports = {
  createTask,
  getTasks,
  createTaskWithCheck,
};
