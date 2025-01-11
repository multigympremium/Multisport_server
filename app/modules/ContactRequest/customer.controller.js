import CustomerModel from "./customer.model.js";


export const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerModel.find({});
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// POST a new customer
export const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company, message, time } = req.body;

        if (!name || !email || !phone || !company || !message) {
            return res
                .status(400)
                .json({ success: false, message: "Required fields are missing" });
        }

        const newCustomer = await CustomerModel.create({
            name,
            email,
            phone,
            company,
            message,
            time: time || Date.now(),
        });

        res.status(201).json({ success: true, data: newCustomer });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// DELETE a customer by ID
export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await CustomerModel.findById(id);
        if (!customer) {
            return res
                .status(404)
                .json({ success: false, message: "Customer not found" });
        }

        await CustomerModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Customer deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// PUT to update customer status to "Served"
export const markCustomerAsServed = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await CustomerModel.findById(id);
        if (!customer) {
            return res
                .status(404)
                .json({ success: false, message: "Customer not found" });
        }

        customer.status = "Served";
        await customer.save();
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// GET customers with search functionality
export const searchCustomers = async (req, res) => {
    const { query } = req.query; // Query will be used to filter customers
    try {
        const customers = await CustomerModel.find({
            $or: [
                { name: new RegExp(query, "i") },
                { email: new RegExp(query, "i") },
                { phone: new RegExp(query, "i") },
                { company: new RegExp(query, "i") },
            ],
        });
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
