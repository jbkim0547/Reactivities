using MediatR;
using Microsoft.VisualBasic;
using Persistence;
using SQLitePCL;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Hnadler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Hnadler(DataContext context)
            {
           
                _context = context;
                
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                _context.Remove(activity);

                await _context.SaveChangesAsync();

            }
        }
    }
}