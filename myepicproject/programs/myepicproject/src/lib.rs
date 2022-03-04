use anchor_lang::prelude::*;

declare_id!("ARZorumoNtY9crW9QdBuzEeVUtquhxSGXME2uHxSVN1C");

#[program]
pub mod myepicproject {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
    let base_account = &mut ctx.accounts.base_account;
    base_account.total_sales = 0;
    Ok(())
  }

  pub fn add_gif(ctx: Context<AddGif>, 
    data: ItemStruct,
  ) -> ProgramResult {
    let base_account = &mut ctx.accounts.base_account;
    let user = &mut ctx.accounts.user;
    base_account.tickets_list.push(data);
    base_account.total_sales += 1;
    Ok(())
  }

  pub fn updateTransactionHas(ctx: Context<AddGif>, hash: String) -> ProgramResult{
    let base_account = &mut ctx.accounts.base_account;
    msg!("working here");
    ok(())
}

#[derive(Accounts)]
pub struct StartStuffOff<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program <'info, System>,
}

// Add the signer who calls the AddGif method to the struct so that we can save it
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
  pub buyer_first_name: String, 
  pub buyer_last_name: String, 
  pub buyer_email: String, 
  pub seller_shop: String, 
  pub purchase_date: String, 
  pub game_name: String, 
  pub draw_day: String, 
  pub ticket_id: String, 
  pub sale_number: u32, 
  pub power_ball: Vec<u32>, 
  pub ticket_price: u32, 
  pub city_power_ball: String,
  pub tx_hash: String,
   // pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_sales: u128,
	// Attach a Vector of type ItemStruct to the account.
    pub tickets_list: Vec<ItemStruct>,
}