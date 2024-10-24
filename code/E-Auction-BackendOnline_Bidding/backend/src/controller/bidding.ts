import { Request, Response } from "express";
import { Bidding, Product } from "../schemas/usersSchema";

// View the Winner based on the Price
export const finalizeBidding = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId } = req.params;

  try {
    const product: any = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ msg: "Product not found" });
      return;
    }

    // Check if the current time is past the end date
    if (new Date() < product.endDate) {
      res.status(400).json({ msg: "Bidding is still ongoing" });
      return;
    }

    // Find all bids for the product that are the highest
    const highestBidAmount = await Bidding.findOne({ bidId: productId }).sort({
      bidAmount: -1,
    });

    if (highestBidAmount) {
      const winningBids = await Bidding.find({
        bidId: productId,
        bidAmount: highestBidAmount.bidAmount,
      })
        .sort({ createdAt: 1 })
        .populate("bidId", "name")
        .populate("buyerId", "username email phone");

      // If there are multiple highest bids, select the first one
      const winningBid = winningBids.length > 0 ? winningBids[0] : null;
      if (winningBid) {
        // Mark the winning bid
        winningBid.isWinningBid = true;
        await winningBid.save();
        res.json({
          msg: "Bidding finalized",
          winner: winningBid,
        });
      } else {
        res.json({ msg: "No bids placed for this product" });
      }
    } else {
      res.json({ msg: "No bids placed for this product" });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
