
import React from 'react';
import { Loan } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface LoanTableProps {
  loans: Loan[];
  title: string;
  showActions?: boolean;
  onLoanAction?: (loanId: string, action: string) => void;
}

const LoanTable: React.FC<LoanTableProps> = ({ loans, title, showActions = false, onLoanAction }) => {
  const getStatusBadgeVariant = (status: Loan['status']) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      case 'disbursed':
        return 'default';
      case 'closed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                {showActions && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.id}</TableCell>
                  <TableCell>{loan.applicantName}</TableCell>
                  <TableCell>{formatCurrency(loan.amount)}</TableCell>
                  <TableCell className="capitalize">{loan.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(loan.status)}>
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(loan.applicationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{loan.agentName}</TableCell>
                  {showActions && (
                    <TableCell>
                      <div className="flex space-x-2">
                        {loan.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => onLoanAction?.(loan.id, 'approve')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onLoanAction?.(loan.id, 'reject')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanTable;
