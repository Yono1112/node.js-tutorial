const express = require("express");
const app = express();
const PORT = 5001;
// jsonを使用することを明示
app.use(express.json())

app.listen(PORT, () => console.log("portがつながりました"));

// "/"はルートディレクトリ(今回はlocalhost:5001)のこと,APIエンドポイントという
// clientが/をgetした場合は、serverはresponseとして"start"という文字列をsendする
app.get("/", (req, res) => {
	res.send("start");
});

// 顧客情報を取得する(getメソッド)
const customers = [
	{ title: "test1", id: 1},
	{ title: "test2", id: 2},
	{ title: "test3", id: 3},
	{ title: "test4", id: 4},
	{ title: "test5", id: 5},
]

app.get("/api/customers", (req, res) => {
	res.send(customers);
});

// 顧客情報を新たに追加する(postメソッド)
app.post("/api/customers", (req, res) => {
	const customer = {
		title: req.body.title,
		id: customers.length + 1,
	};
	customers.push(customer);
	res.send(customer);
})

app.put("/api/customers/:id", (req, res) => {
	const customer = customers.find((c) => c.id === parseInt(req.params.id))
	customer.title = req.body.title;
	res.send(customer);
})