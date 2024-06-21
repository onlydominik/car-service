using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Programowanie_Lab2.Data;
using Programowanie_Lab2.Entities;



namespace Programowanie_Lab2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly DataContext _context;

        public TransactionController(DataContext context)
        {
            _context = context;
        }


        [HttpPut("{margin}/{value}/{id}")]

        public async Task<ActionResult<List<Transaction>>> totalcostTransaction(decimal margin, decimal value, int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null)
            {
                return NotFound("Nie ma takiego produktu!");
            }
            decimal l = margin / 100;
            decimal pozostalosc = value * l;
            decimal wynik = value + pozostalosc;
            transaction.totalcost = wynik.ToString() + " zł";
            await _context.SaveChangesAsync();


            return Ok(await _context.Transactions.ToListAsync());
        }



        [HttpPost("decline/{id}")]
        public async Task<ActionResult<List<Transaction>>> declineTransaction(int id)
        {
            
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null)
            {
                
                return NotFound("Nie ma takiej wizyty!");
            }

           

            transaction.status = "Odrzucono";
            await _context.SaveChangesAsync();


            return Ok(await _context.Transactions.ToListAsync());
            

        }




        [HttpPost("addTransaction")]
        public async Task<ActionResult<List<Transaction>>> AddTransaction(Transaction AddTransaction)
        {
            if (AddTransaction is null) return BadRequest();

            await _context.Transactions.AddAsync(AddTransaction);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Pomyślnie umówiłeś wizytę!" });

        }





        [HttpDelete]

        public async Task<ActionResult<List<Transaction>>> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction is null)
            {
                return NotFound("Nie ma takiej transakcji!");
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();


            return Ok(await _context.Transactions.ToListAsync());
        }



        [HttpGet]
        public async Task<ActionResult<List<Transaction>>> GetAllTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();

            return Ok(transactions);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<List<Transaction>>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction is null)
            {
                return NotFound("Nie ma takiej transkacji!");
            }

            return Ok(transaction);
        }


       

        
    }
}
