import { Request, Response } from "express";
import { Bidding, Payment, Product } from "../schemas/usersSchema";

// Buyer can make a payment after winning a bid
export const makePayment = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { bidId, buyerId } = req.params;
  const { cardHolder, cardNumber, cvv, expiryDate, paymentmode } = req.body;

  try {
    // Find the bid by ID and check if it is a winning bid
    const bid = await Bidding.findOne({
      bidId: bidId,
      buyerId: buyerId,
      isWinningBid: true,
    });

    if (!bid || !bid.isWinningBid) {
      return res
        .status(400)
        .json({ msg: "Invalid bid or bidding has not been finalized" });
    }

    // Create a new payment entry
    const payment = new Payment({
      bidId,
      buyerId,
      cardHolder,
      cardNumber,
      cvv,
      expiryDate,
      amount: bid.bidAmount,
      paymentmode,
    });

    // Save the payment to the database
    await payment.save();

    await Bidding.updateOne(
      { bidId: bidId, buyerId: buyerId, isWinningBid: true },
      { paymentStatus: true }
    );

    // Respond with success
    res.status(201).json({ msg: "Payment successful", payment });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.msg });
  }
};

// View All Payments Based on Bid Id
export const viewBidPayments = async (
  req: Request,
  res: Response
): Promise<any> => {
  const bidid = req.params.bidId;
  try {
    const result: any = await Payment.findOne({ bidId: bidid })
      .populate("buyerId", "username email phone")
      .select(["-createdAt", "-updatedAt"]);

    if (!result) {
      return res.send({ msg: "No payments found" });
    }

    const productname: any = await Product.findById(result.bidId);
    const finalResult = {
      ...result.toObject(),
      productName: productname.name,
    };
    res.send(finalResult);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
